import '../../../style/Home/roadmap/roadmap.css';

function Roadmap() {
  const milestones = [
    {
      title: 'Q4 2021',
      paragraphs: [
        'Projct concept',
        'IDO',
        'Mini-games release',
        'Platform Launch',
        'DEX Listing',
      ],
      size: 'm',
    },
    {
      title: 'Q1 2022',
      paragraphs: ['NFT Games release', 'NFT marketplace', 'Staking', 'Referral system'],
      size: 'l',
    },
    {
      title: 'Q2 2022',
      paragraphs: ['Strategic Partnership', 'Mobile app release', 'Tiered reward system'],
      size: 'm',
    },
    {
      title: 'Q3 2022',
      paragraphs: ['Game Distribution platform release', 'Multiplayer games'],
      size: 's',
    },
    {
      title: 'Q4 2022',
      paragraphs: [
        'Partnership with gamedev corporations',
        'AAA play-to-earn games launching',
        'CEX Listing',
      ],
      size: 'l',
    },
  ];

  return (
    <div id='roadmap' className='roadmap container content'>
      <div className='roadmap_content'>
        <h2 className='title font_subtitle roadmap_content_title'>Roadmap</h2>
        <div className='roadmap_graph_line appear on_invisible_opacity'>
          <div className='roadmap_graph'>
            {/*  */}
            {milestones.map((item, index) => {
              return (
                <div key={index} id={`point${index + 1}`} className='roadmap_graph_point'>
                  <div className={`roadmap_graph_point_dot_ dot_${item.size}_`}></div>
                  <div className={`roadmap_graph_point_dot dot_${item.size}`}></div>
                  <div className='roadmap_graph_point_text'>
                    <h3 className='title font14'>{item.title}</h3>
                    {item.paragraphs.map((par, index) => {
                      return (
                        <p key={index + 100} className='text font14'>
                          {par}
                        </p>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <svg
            width='100%'
            height='100%'
            viewBox='0 0 880 272'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <g filter='url(#filter0_d_301_810)'>
              <path
                d='M6.99986 156.422L259 42.4216L449 264.42L655 7.42158L873 207.422'
                stroke='#00A3FF'
              />
            </g>
            <defs>
              <filter
                id='filter0_d_301_810'
                x='0.793823'
                y='0.691772'
                width='878.544'
                height='270.512'
                filterUnits='userSpaceOnUse'
                colorInterpolationFilters='sRGB'>
                <feFlood floodOpacity='0' result='BackgroundImageFix' />
                <feColorMatrix
                  in='SourceAlpha'
                  type='matrix'
                  values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                  result='hardAlpha'
                />
                <feOffset />
                <feGaussianBlur stdDeviation='3' />
                <feComposite in2='hardAlpha' operator='out' />
                <feColorMatrix
                  type='matrix'
                  values='0 0 0 0 0.225 0 0 0 0 0.535 0 0 0 0 1 0 0 0 0.5 0'
                />
                <feBlend
                  mode='normal'
                  in2='BackgroundImageFix'
                  result='effect1_dropShadow_301_810'
                />
                <feBlend
                  mode='normal'
                  in='SourceGraphic'
                  in2='effect1_dropShadow_301_810'
                  result='shape'
                />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Roadmap;
