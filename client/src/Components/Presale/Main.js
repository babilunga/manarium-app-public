import '../../style/Presale1/main.css';
import StatInline from './StatInline';
import { AppContext } from '../App';

function Main(props) {
  const { MIN_BUY, MAX_BUY } = props;

  return (
    <div className='presale_main'>
      <div className='presale_main__content'>
        <div className='presale_card__container'>
          <div className='presale_card'>
            {/* *** COUNTER *** */}
            <div>
              <h2
                className='font18 title'
                style={{ textAlign: 'center', marginBottom: '15px' }}>
                Seed sale
              </h2>
            </div>

            {/* *** STATS *** */}
            <div className='presale_card_stats'>
              <StatInline title='Status' text={'Ended'} />
              <StatInline title='Sale Type' text='Seed' />
              <StatInline title='Minimum Buy' text={`${MIN_BUY} BNB`} />
              <StatInline title='Maximum Buy' text={`${MAX_BUY} BNB`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const MainConteiner = (props) => {
  return <AppContext.Consumer>{(context) => <Main {...props} />}</AppContext.Consumer>;
};

export default MainConteiner;
