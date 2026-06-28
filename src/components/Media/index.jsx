import Image from "next/image";
import styles from "./Media.module.css";

export default function Media({
  type = "image", // "image" or "video"
  src,
  alt = "",
  width,
  height,
  aspectRatio = "16/9",
  fill = false,
  priority = false,
  ...props
}) {
  return (
    <div
      className={`${styles.wrapper} ${fill ? styles.fill : ""}`}
      style={fill ? { "--aspect-ratio": aspectRatio } : undefined}
    >
      {type === "image" ? (
        <Image
          src={src}
          alt={alt}
          fill={fill}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          priority={priority}
          sizes="100vw"
          {...props}
        />
      ) : (
        <video
          className={styles.video}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          {...props}
        />
      )}
    </div>
  );
}