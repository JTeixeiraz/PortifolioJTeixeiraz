import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage

PAPER = (246, 247, 248)
CROPS = {
    "armor1535b": (0.14, 0.02, 0.90, 0.965),
    "armor1400":  (0.20, 0.02, 0.84, 0.965),
    "lion_sallet":(0.02, 0.04, 0.98, 0.94),
}

def dark_subject(name, spacing=8, angle=22.0, ss=3, size=1900, rfac=0.72, tol=10):
    """Aço escuro sobre fundo claro é o inverso do mármore: aqui o objecto é
    MAIS ESCURO que o fundo. Recorto por essa diferença e depois normalizo a
    faixa tonal só dentro da peça, para as placas voltarem a ter luz."""
    im = Image.open(f"med/{name}.jpg").convert("L")
    W0, H0 = im.size
    fx0, fy0, fx1, fy1 = CROPS[name]
    im = im.crop((int(fx0*W0), int(fy0*H0), int(fx1*W0), int(fy1*H0)))
    g = np.asarray(im).astype(np.float32)
    h, w = g.shape

    m = max(6, w//30)
    left = np.median(g[:, :m], axis=1); right = np.median(g[:, -m:], axis=1)
    ramp = np.linspace(0,1,w)[None,:]
    bg = left[:,None]*(1-ramp) + right[:,None]*ramp
    bg = ndimage.gaussian_filter1d(bg, sigma=h*0.02, axis=0)

    mask = (bg - g) > tol
    k = max(3, int(min(h,w)*0.005)) | 1
    mask = ndimage.binary_closing(mask, np.ones((k,k)))
    mask = ndimage.binary_fill_holes(mask)
    lab, n = ndimage.label(mask)
    if n:
        sizes = ndimage.sum(mask, lab, range(1,n+1))
        mask = lab == int(np.argmax(sizes))+1
    mask = ndimage.binary_fill_holes(mask)

    inside = g[mask]
    lo, hi = np.percentile(inside, 4), np.percentile(inside, 98)
    t = np.clip((g - lo)/max(1.0, hi-lo), 0, 1)
    t = np.where(mask, t*0.86 + 0.14, 0.0)   # piso: a peça nunca desaparece

    r = size/max(h, w)
    tw, th = int(w*r), int(h*r)
    t = np.asarray(Image.fromarray((t*255).astype(np.uint8)).resize((tw,th), Image.LANCZOS)).astype(np.float32)/255

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
            if lum <= 0.04: continue
            rad = rmax*np.sqrt(lum)
            if rad < 0.3: continue
            cx, cy, rr = x*ss, y*ss, rad*ss
            d.ellipse([cx-rr, cy-rr, cx+rr, cy+rr], fill=255)

    alpha = np.asarray(canvas.resize((tw,th), Image.LANCZOS)).astype(np.float32)
    img = Image.merge("RGBA", (*Image.new("RGB",(tw,th),PAPER).split(),
                               Image.fromarray(np.clip(alpha,0,255).astype(np.uint8))))
    img.save(f"med/{name}_ht.png"); return img

names = list(CROPS)
for n in names: print(n, dark_subject(n).size)
h=660
ims=[Image.open(f"med/{n}_ht.png") for n in names]
ims=[i.resize((int(i.width*h/i.height),h),Image.LANCZOS) for i in ims]
W=sum(i.width for i in ims)+30*len(ims)
sheet=Image.new("RGB",(W,h+30),(10,12,17)); x=15
for i in ims: sheet.paste(i,(x,15),i); x+=i.width+30
sheet.save("med/ht_sheet.png"); print("sheet", sheet.size)
