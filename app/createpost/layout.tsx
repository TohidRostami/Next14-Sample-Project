import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <p style={{ fontSize: "0.8rem", fontStyle: "italic" }}>
        `&quot;`Add your favorite Product with details to sell them and make some
          money`&quot;`
        </p>
      </div>
      <section>{children}</section>
    </div>
  );
};

export default layout;
