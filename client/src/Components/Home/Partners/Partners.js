import '../../../style/Home/partners/partners.css';

import astronaut_logo from '../../../img/Home/Partners/astronaut_logo.png';
import infinitypad_logo from '../../../img/Home/Partners/infinitypad_logo.png';
import kommunitas_logo from '../../../img/Home/Partners/kommunitas_logo.png';
import milkyway_logo from '../../../img/Home/Partners/milkyway_logo.png';
import ape from '../../../img/Home/Partners/ape.png';

function Partners() {
  return (
    <div id='partners' className='container content partners'>
      <div className='partners_content'>
        <h2 className='title font32'>Our official partners</h2>
        <div className='partners_logos appear on_invisible'>
          <div className='partner_logo'>
            <img src={milkyway_logo} alt={`logo of manarium's partner milkyway`} />
          </div>
          <div className='partner_logo'>
            <img src={astronaut_logo} alt={`logo of manarium's partner astronaut`} />
          </div>
          <div className='partner_logo'>
            <img src={kommunitas_logo} alt={`logo of manarium's partner kommunitas`} />
          </div>
          <div className='partner_logo'>
            <img src={infinitypad_logo} alt={`logo of manarium's partner infinitypad`} />
          </div>
          <div className='partner_logo'>
            <img src={ape} alt={`logo of manarium's partner ape`} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Partners;
