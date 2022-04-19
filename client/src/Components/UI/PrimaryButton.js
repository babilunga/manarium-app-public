import { css } from '@emotion/css';
import { useEffect, useRef } from 'react';

function PrimaryButton(props) {
	const { title, titleClasses, classes, onClickFunction, isDisabled } = props;

	const buttonRef = useRef(null);

	useEffect(() => {
		if (isDisabled === true) {
			buttonRef.current.addEventListener('click', clickHandler);
		} else {
			buttonRef.current.removeEventListener('click', clickHandler);
		}
		return () => buttonRef.current.removeEventListener('click', clickHandler);
	}, [isDisabled]);

	function clickHandler(e) {
		e.stopPropagation();
		e.preventDefault();
	}

	return (
		<button
			className={`${css`
				color: white;
				background-color: var(--accent-color);
				border-style: none;
				border-radius: 200vw;
				display: flex;
				justify-content: center;
				align-items: center;
				cursor: pointer;
				transition: box-shadow 150ms ease-in-out, transform 150ms ease;
				&:hover {
					transform: scale(1.05);
					box-shadow: 0 0 20px rgba(0, 163, 255, 0.3);
					transition: box-shadow 50ms ease-in-out, transform 50ms ease;
				}
				&:active {
					transition: box-shadow 0ms ease-in-out, transform 0ms ease;
					filter: brightness(1.1);
					transform: scale(1.03);
					box-shadow: 0 0 20px rgba(0, 163, 255, 0.4);
				}
				&:disabled {
					transform: scale(1);
					filter: brightness(1.1) saturate(20%);
					box-shadow: none;
					cursor: not-allowed;
				}
				@media screen and (max-width: 550px) {
					& .primary_button_content {
						font-size: 12px;
					}
				}
			`} ${classes}`}
			onClick={onClickFunction}
			disabled={isDisabled === undefined ? false : isDisabled}>
			<div
				ref={buttonRef}
				className={`primary_button_content ${css`
					font-size: 14px;
					transition: transform 75ms ease;
				`} ${titleClasses}`}>
				{title}
			</div>
		</button>
	);
}

export default PrimaryButton;
