import './textWidget.css'

const TextWidget = (props) => {
    const text = props.data.split('')
    const input = props.input.split('')


    return ( 
        <div className="textWidget">
            {
                text.map((letter, index) => {
                    let color;
                    if ( index < input.length) {
                        color = letter === input[index] ? 'lightgreen' : 'crimson'
                    }
                    return(
                        <span 
                            className={letter === " " ? "letter space" : "letter"} 
                            key={index}
                            style={{ backgroundColor: color }}
                        >{letter}</span> 
                    )
                })
            }
        </div>
     );
}
 
export default TextWidget;