import { createPortal } from "react-dom";

const EmailSubjectModal: React.FC<{
  subject: string;
  content: string;
  onClose: () => void;
}> = ({ subject, content, onClose }) => (
  <>
    {createPortal(
      <div className="modal-open modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <button
            aria-label="Close read more section"
            className="btn-sm btn-circle btn absolute right-2 top-2"
            onClick={onClose}
          >
            ✕
          </button>
          <h3 className="text-lg font-bold">{subject}</h3>
          <p
            className="py-4"
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
          <div className="modal-action">
            <button className="btn-primary btn">Get a reply</button>
          </div>
        </div>
      </div>,
      document.body
    )}
  </>
);

export default EmailSubjectModal;
