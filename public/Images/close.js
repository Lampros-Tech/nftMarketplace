function Close({style}){
	const CloseStyle={
		enableBackground:'new 0 0 1792 1792'
	}
	return(
		<div style={style}>
			<svg version="1.1" id="Layer_1" x="0px" y="0px"
				viewBox="0 0 1792 1792" style={CloseStyle}>
			<path d="M1082.2,896.6l410.2-410c51.5-51.5,51.5-134.6,0-186.1s-134.6-51.5-186.1,0l-410.2,410L486,300.4
				c-51.5-51.5-134.6-51.5-186.1,0s-51.5,134.6,0,186.1l410.2,410l-410.2,410c-51.5,51.5-51.5,134.6,0,186.1
				c51.6,51.5,135,51.5,186.1,0l410.2-410l410.2,410c51.5,51.5,134.6,51.5,186.1,0c51.1-51.5,51.1-134.6-0.5-186.2L1082.2,896.6z"/>
			</svg>
		</div>		
	)
}
export default Close
