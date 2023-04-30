import React from 'react'
import styles from './SubMenuField.module.css'

interface ISubMenuField {
	fieldName: string
}

export default function SubMenuField({ fieldName }: ISubMenuField) {
	return (
		<div className={styles.fieldContainer}>
			<label className={styles.fieldTitle}>{fieldName}</label>
			<input
				required minLength={8} // Very simple form validation
				className={styles.field}
				type="text"
				name="name"
			/>
		</div>
	)
}
