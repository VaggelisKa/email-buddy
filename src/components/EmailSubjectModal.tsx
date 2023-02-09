const EmailSubjectModal: React.FC<{ subject: string }> = ({ subject }) => (
  <>
    <input type="checkbox" id="read-more-modal" className="modal-toggle" />
    <div className="modal modal-open modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="text-lg font-bold">
          Congratulations random Internet user!
        </h3>
        <p className="py-4" dangerouslySetInnerHTML={{ __html: subject }} />
        <div className="modal-action">
          <label htmlFor="read-more-modal" className="btn-primary btn">
            Yay!
          </label>
        </div>
      </div>
    </div>
  </>
);

export default EmailSubjectModal;
