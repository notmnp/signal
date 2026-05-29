/**
 * Fixed, non-interactive background: a barely-there grid for subtle paper
 * texture, fading out toward the bottom. Pure CSS, server component.
 */
export default function Backdrop() {
  return (
    <div
      aria-hidden
      className="bg-grid pointer-events-none fixed inset-0 -z-10 opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
    />
  );
}
