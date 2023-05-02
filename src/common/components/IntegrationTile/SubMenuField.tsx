import React from 'react'
import styles from './SubMenuField.module.css'

interface ISubMenuField {
	fieldName: string
	paramVals: { [key: string]: string }
	setParamVals: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>
}

export default function SubMenuField({ fieldName, paramVals, setParamVals }: ISubMenuField) {

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
				name={fieldName}
				defaultValue={paramVals[fieldName] ?? ""}
				onChange={(event) => changeFieldVal(event.target.value)}
			/>
		</div>
	)
}
