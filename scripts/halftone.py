import numpy as np
from PIL import Image, ImageDraw

PAPER = (246, 247, 248)

# recortes medidos à mão sobre a folha de contacto, em fração da imagem
CROPS = {
    "apollo":        (0.06, 0.02, 0.68, 0.79),
    "athena_head":   (0.14, 0.03, 0.90, 0.83),
    "herakles_head": (0.24, 0.06, 0.80, 0.85),
    "ruler":         (0.18, 0.05, 0.85, 0.775),
    "philosopher":   (0.16, 0.06, 0.84, 0.82),
    "youth_head":    (0.16, 0.02, 0.94, 0.85),
    # Júlio César
    "caesar_vatican":  (0.04, 0.00, 0.96, 0.56),
    "caesar_florence": (0.35, 0.085, 0.645, 0.45),
    "caesar_florence2":(0.36, 0.075, 0.66, 0.44),
    # medieval — armadura de placas e elmos (Met, Arms and Armor, CC0)
    "armor1535b": (0.14, 0.02, 0.90, 0.985),
    "armor1400":  (0.20, 0.02, 0.84, 0.985),
    "lion_sallet":(0.02, 0.04, 0.98, 0.96),
}

# Fotos cujo fundo não é o cinza neutro do museu: o ponto-preto vem de
# percentis da imagem inteira, não das bordas.
LEVELS = {"caesar_vatican": (34, 99.0)}
GAMMA = {"armor1535b": 1.05, "armor1400": 1.05, "lion_sallet": 1.15}

def halftone(name, spacing=8, angle=22.0, ss=3, size=1500, gamma=1.45, rfac=0.72):
    gamma = GAMMA.get(name, gamma)
    src = f"med/{name}.jpg" if name in ("armor1535b","armor1400","lion_sallet") else f"stat/{name}.jpg"
    im = Image.open(src).convert("L")
    W0, H0 = im.size
    fx0, fy0, fx1, fy1 = CROPS[name]
    im = im.crop((int(fx0*W0), int(fy0*H0), int(fx1*W0), int(fy1*H0)))

    g = np.asarray(im).astype(np.float32)
    h, w = g.shape
    if name in LEVELS:
        lo, hi = LEVELS[name]
        black = np.percentile(g, lo)
        white = np.percentile(g, hi)
    else:
        border = np.concatenate([g[:, :max(3,w//22)].ravel(), g[:, -max(3,w//22):].ravel()])
        black = np.percentile(border, 82) + 4
        white = np.percentile(g, 99.2)
    t = np.clip((g - black) / max(1.0, white - black), 0, 1) ** gamma

    r = size / max(h, w)
    tw, th = int(w*r), int(h*r)
    t = np.asarray(Image.fromarray((t*255).astype(np.uint8)).resize((tw, th), Image.LANCZOS)).astype(np.float32)/255

    canvas = Image.new("L", (tw*ss, th*ss), 0)
    d = ImageDraw.Draw(canvas)
    a = np.radians(angle); ca, sa = np.cos(a), np.sin(a)
    diag = int(np.hypot(tw, th)) + spacing*2
    rmax = spacing*rfac
    for v in range(-diag//spacing, diag//spacing+1):
        for u in range(-diag//spacing, diag//spacing+1):
            x = (u*spacing)*ca - (v*spacing)*sa + tw/2
            y = (u*spacing)*sa + (v*spacing)*ca + th/2
            xi, yi = int(x), int(y)
            if xi < 0 or yi < 0 or xi >= tw or yi >= th: continue
            lum = float(t[yi, xi])
            if lum <= 0.03: continue
            rad = rmax*np.sqrt(lum)
            if rad < 0.32: continue
            cx, cy, rr = x*ss, y*ss, rad*ss
            d.ellipse([cx-rr, cy-rr, cx+rr, cy+rr], fill=255)

    alpha = np.asarray(canvas.resize((tw, th), Image.LANCZOS)).astype(np.float32)
    yy = np.linspace(0,1,th)[:,None]; xx = np.linspace(0,1,tw)[None,:]
    ramp = lambda v: np.clip(np.minimum(v, 1-v)/0.09, 0, 1)
    alpha *= np.clip((ramp(xx)*ramp(yy))**0.55*1.2, 0, 1)
    img = Image.merge("RGBA", (*Image.new("RGB",(tw,th),PAPER).split(),
                               Image.fromarray(np.clip(alpha,0,255).astype(np.uint8))))
    img.save(f"stat/{name}_ht.png"); return img

names = ["armor1535b","armor1400","lion_sallet"]
for n in names: print(n, halftone(n).size)
h=640
ims=[Image.open(f"stat/{n}_ht.png") for n in names]
ims=[i.resize((int(i.width*h/i.height),h),Image.LANCZOS) for i in ims]
W=sum(i.width for i in ims)+30*len(ims)
sheet=Image.new("RGB",(W,h+30),(10,12,17)); x=15
for i in ims: sheet.paste(i,(x,15),i); x+=i.width+30
sheet.save("stat/heads.png"); print("sheet",sheet.size)
