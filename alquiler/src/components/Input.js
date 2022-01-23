

const Input = ({estado, handle, tipo, label, placeholder, nombre}) => {
	
	return (
		<div>
			<label htmlFor={nombre} >{label}</label>
				<input
				className="Input"
					type={tipo}
					placeholder={placeholder}
					id={nombre}
					value={estado}
					name={nombre}
					onChange={handle}
				/>
		</div>
	);
}

export default Input;