import '../../../style/Home/advantages/advantages.css';

import AdvCard from './AdvCard';
import image1 from '../../../img/Home/Advantages/playtoearn.png';
import image2 from '../../../img/Home/Advantages/tournaments.png';
import image3 from '../../../img/Home/Advantages/launch.png';

function Advantages() {
  return (
    <div id='advantages' className='advantages container content'>
      <div className='advantages_content'>
        <h2 className='title font_subtitle'>Advantages</h2>
        <div className='advantages_cards'>
          <AdvCard
            image={image1}
            title={'Play to earn'}
            text={'Use it to play games and win rewards'}
            classes={'appear on_invisible_left'}
          />
          <AdvCard
            isLeft={true}
            image={image2}
            title={'Tournaments'}
            text={'Participate in tournaments with huge prize pools'}
            classes={'appear on_invisible_right'}
          />
          <AdvCard
            image={image3}
            title={'Launch your games'}
            text={'Apply your own game for launch and earn'}
            classes={'appear on_invisible_left'}
          />
        </div>
      </div>
    </div>
  );
}

export default Advantages;
