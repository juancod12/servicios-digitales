"""
Copia los menús de demostración a /demos sin modificar su código.

  python scripts/demos.py copiar      copia las demos y optimiza SOLO las imágenes
                                      (mismos nombres y formatos; máx. 900 px)
  python scripts/demos.py verificar   comprueba que html/css/js/json de /demos son
                                      idénticos byte a byte a los originales

Para agregar una demo nueva: añádela a DEMOS y a js/config.js (campo "demo").
"""
import hashlib
import shutil
import sys
from pathlib import Path

from PIL import Image

RAIZ = Path(__file__).resolve().parent.parent          # servicios_web/
ORIGEN = RAIZ.parent                                   # Plataformas_Servicios/
DEMOS = {
    'basico': ORIGEN / 'Menu_Basico',
    'pro': ORIGEN / 'Menu_Galeria',
}
CODIGO = {'.html', '.css', '.js', '.json', '.md', '.txt'}
IMAGEN = {'.jpg', '.jpeg', '.png', '.webp'}
LADO_MAX = 900


def sha(p: Path) -> str:
    return hashlib.sha256(p.read_bytes()).hexdigest()


def optimizar(src: Path, dst: Path) -> None:
    try:
        im = Image.open(src)
        fmt = im.format
        im.load()
    except Exception:
        shutil.copy2(src, dst)
        return
    if max(im.size) > LADO_MAX:
        im.thumbnail((LADO_MAX, LADO_MAX), Image.LANCZOS)
    tmp = dst.with_suffix(dst.suffix + '.tmp')
    if fmt == 'JPEG':
        im.convert('RGB').save(tmp, 'JPEG', quality=78, optimize=True, progressive=True)
    elif fmt == 'PNG':
        # Paleta de 256 colores (conserva la transparencia): suele pesar ~70 % menos.
        im.convert('RGBA').quantize(256, method=Image.Quantize.FASTOCTREE).save(tmp, 'PNG', optimize=True)
    elif fmt == 'WEBP':
        im.save(tmp, 'WEBP', quality=78)
    else:
        shutil.copy2(src, dst)
        return
    # Solo se usa la versión optimizada si de verdad pesa menos.
    if tmp.stat().st_size < src.stat().st_size:
        tmp.replace(dst)
    else:
        tmp.unlink()
        shutil.copy2(src, dst)


def copiar() -> None:
    for nombre, src in DEMOS.items():
        dst = RAIZ / 'demos' / nombre
        if dst.exists():
            shutil.rmtree(dst)
        antes = despues = 0
        for f in src.rglob('*'):
            rel = f.relative_to(src)
            if '.git' in rel.parts or f.is_dir() or f.name in {'.gitignore', 'package.json', 'vercel.json'}:
                continue
            d = dst / rel
            d.parent.mkdir(parents=True, exist_ok=True)
            if f.suffix.lower() in IMAGEN:
                optimizar(f, d)
            else:
                shutil.copy2(f, d)
            antes += f.stat().st_size
            despues += d.stat().st_size
        print(f'{nombre}: {antes / 1e6:.1f} MB -> {despues / 1e6:.1f} MB')
    verificar()


def verificar() -> bool:
    ok = True
    for nombre, src in DEMOS.items():
        dst = RAIZ / 'demos' / nombre
        n = 0
        for f in src.rglob('*'):
            rel = f.relative_to(src)
            if '.git' in rel.parts or f.is_dir() or f.suffix.lower() not in CODIGO:
                continue
            if f.name in {'package.json', 'vercel.json'}:
                continue
            d = dst / rel
            n += 1
            if not d.exists() or sha(f) != sha(d):
                print(f'  DIFERENTE: {nombre}/{rel}')
                ok = False
        # Toda imagen original debe existir en la copia con el mismo nombre.
        for f in src.rglob('*'):
            if f.is_file() and f.suffix.lower() in IMAGEN and '.git' not in f.relative_to(src).parts:
                if not (dst / f.relative_to(src)).exists():
                    print(f'  FALTA: {nombre}/{f.relative_to(src)}')
                    ok = False
        print(f'{nombre}: {n} archivos de código comparados')
    print('VERIFICACIÓN OK: el código de las demos es idéntico al original' if ok else 'VERIFICACIÓN FALLÓ')
    return ok


if __name__ == '__main__':
    accion = sys.argv[1] if len(sys.argv) > 1 else 'verificar'
    if accion == 'copiar':
        copiar()
    else:
        sys.exit(0 if verificar() else 1)
