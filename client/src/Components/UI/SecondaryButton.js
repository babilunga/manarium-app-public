// import '../../style/UI/buttonSecondary.css';
import { css } from '@emotion/css';

function SecondaryButton(props) {
	const { classes, isDisabled } = props;
	return (
		<button
			disabled={isDisabled === undefined ? false : isDisabled}
			className={`${css`
				display: block;
				text-align: center;
				color: white;

				display: flex;
				justify-content: center;
				align-items: center;

				background: transparent;
				border: 2px solid var(--accent-color);
				border-radius: 200vw;
				box-shadow: 0 0 20px rgba(0, 163, 255, 0);
				transition: box-shadow 150ms ease-in-out, transform 150ms ease-in-out;

				cursor: pointer;
				&:hover {
					transition: box-shadow 50ms ease-in-out, transform 50ms ease-in-out;
					transform: scale(1.03);
					box-shadow: 0 0 20px rgba(0, 163, 255, 0.3);
				}
				&:hover svg {
					filter: brightness(1.1);
				}
				&:active {
					filter: brightness(1.2);
					transform: scale(1.01);
					box-shadow: 0 0 20px rgba(0, 163, 255, 0.4);
				}
				&:disabled {
					filter: brightness(1.04) saturate(60%);
					cursor: not-allowed;
				}
				& svg {
					transform: translateY(25%) translateX(-12px);
					transition: all 75ms ease-in-out;
				}
				@media screen and (max-width: 550px) {
					& p {
						font-size: 12px;
					}
				}
			`} ${classes}`}>
			{props.children}
		</button>
	);
}

export default SecondaryButton;
