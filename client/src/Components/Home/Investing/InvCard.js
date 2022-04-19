import '../../../style/Home/investing/inv_card.css';

function AdvCard(props) {
  const { title, text, children, classes } = props;
  return (
    <div className={`inv_card ${classes ? classes : ''}`}>
      <div className="inv_card_icon">{children}</div>
      <div className="inv_card_info">
        <h3 className="title font14">{title}</h3>
        <p className="text font14">{text}</p>
      </div>
    </div>
  );
}

export default AdvCard;
