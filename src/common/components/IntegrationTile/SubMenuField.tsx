import React from 'react'
import styles from './SubMenuField.module.css'

interface ISubMenuField {
	fieldName: string
}

export default function SubMenuField({ fieldName }: ISubMenuField) {
	return (
		<div className={styles.fieldContainer}>
			<p className={styles.fieldTitle}>{fieldName}</p>
			<input className={styles.field} type="text" name="name" />
		</div>
	)
}
