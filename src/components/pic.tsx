import { IMAGES, type ImageId } from "@/lib/images";

/**
 * Imagem servida em AVIF com WebP de reserva, em várias larguras, a partir
 * do manifesto gerado por scripts/images.mjs. Largura e altura vão no <img>
 * para o navegador reservar o espaço antes de baixar — sem layout shift.
 *
 * `priority` é só para o que aparece no primeiro quadro: baixa cedo e não
 * espera o lazy-load.
 */
export function Pic({
  id,
  alt,
  sizes,
  className,
  imgClassName,
  priority = false,
}: {
  id: ImageId;
  alt: string;
  sizes: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}) {
  const img = IMAGES[id];
  const set = (ext: string) =>
    img.widths.map((w) => `/img/${id}-${w}.${ext} ${w}w`).join(", ");
  const largest = img.widths[img.widths.length - 1];

  return (
    <picture className={className}>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
      {/* <img> direto: export estático, o otimizador do Next não roda aqui */}
      <img
        src={`/img/${id}-${largest}.webp`}
        width={img.width}
        height={img.height}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className={imgClassName}
      />
    </picture>
  );
}
