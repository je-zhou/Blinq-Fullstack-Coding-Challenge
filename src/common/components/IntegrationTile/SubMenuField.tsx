import React from 'react'
import styles from './SubMenuField.module.css'

interface ISubMenuField {
	fieldName: string
	setParamVals: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>
}

export default function SubMenuField({ fieldName, setParamVals }: ISubMenuField) {

	// Update the value for this fieldName in the object holding the parameter values
	function changeFieldVal(val: string) {
		setParamVals(prevVals => {
			prevVals[fieldName] = val
			return prevVals;
		})
	}

	return (
		<div className={styles.fieldContainer}>
			<label className={styles.fieldTitle}>{fieldName}</label>
			<input
				required minLength={8} // Very simple form validation
				className={styles.field}
				type="text"
				name="name"
				onChange={(event) => changeFieldVal(event.target.value)}
			/>
		</div>
	)
}
