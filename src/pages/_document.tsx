import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      {/* <div className="modal modal-open modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="text-lg font-bold">
            Congratulations random Internet user!
          </h3>
          <p className="py-4">some</p>
          <div className="modal-action">
            <label htmlFor="read-more-modal" className="btn-primary btn">
              Yay!
            </label>
          </div>
        </div>
      </div> */}
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
