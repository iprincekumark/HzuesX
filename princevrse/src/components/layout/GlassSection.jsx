/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   GlassSection — Wrapper with glass card styling
   
   In dark mode: translucent glass panel over Aurora
   In light mode: subtle frosted white card
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function GlassSection({
    id,
    children,
    className = "",
    noPadding = false,
}) {
    return (
        <section
            id={id}
            className={`
        glass rounded-xl md:rounded-2xl
        ${noPadding ? "" : "p-4 md:p-10"}
        mx-4 md:mx-8 lg:mx-auto lg:max-w-6xl
        mb-8
        ${className}
      `}
        >
            {children}
        </section>
    );
}
