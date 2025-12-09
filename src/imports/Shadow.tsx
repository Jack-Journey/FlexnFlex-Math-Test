export default function Shadow() {
  return (
    <div className="relative size-full" data-name="Shadow">
      <div className="absolute inset-0" data-name="Shadow" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 200 50\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(10 0 0 2.5 100 25)\\\'><stop stop-color=\\\'rgba(0,0,0,0.75)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(0,0,0,0.5)\\\' offset=\\\'0.25\\\'/><stop stop-color=\\\'rgba(0,0,0,0.25)\\\' offset=\\\'0.5\\\'/><stop stop-color=\\\'rgba(0,0,0,0)\\\' offset=\\\'1\\\'/></radialGradient></defs></svg>')" }} />
    </div>
  );
}