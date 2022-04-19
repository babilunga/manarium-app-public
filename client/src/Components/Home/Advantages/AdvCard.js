import '../../../style/Home/advantages/advcard.css';

function InvCard(props) {
  const { title, text, image, isLeft, classes } = props;
  return (
    <div className={`invcard ${classes ? classes : ''}`}>
      <div className='invcard_image'>
        <img data-src={image} alt='visualizing main goal of the curent point' />
      </div>
      <div className={`${isLeft && 'invcard_info_left'} invcard_info`}>
        <h3 className='title font36'>{title}</h3>
        <p className='text font18'>{text}</p>
      </div>
    </div>
  );
}

export default InvCard;
