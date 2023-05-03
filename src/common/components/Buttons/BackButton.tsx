import React, { MouseEventHandler } from 'react'
import styles from './Button.module.css'
import LoadingIndicator from '@components/LoadingIndicator/LoadingIndicator'
import { IButton } from './Buttons'

export default function BackButton({ onClick, text, isLoading, type }: IButton) {
	return (
		<button type={type} className={`${styles.button} ${styles.back}`} onClick={onClick}>
			{isLoading ? <LoadingIndicator /> : text ?? ""}
		</button>
	)
}
