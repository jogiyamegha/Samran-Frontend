export type Props = {
    value: string;
    valueLength: number;
    autoFocus?: boolean;
    onChange: (value: string) => void;
};
export default function OtpInput(props: any) {
    const valueLength = props.valueLength || 4;
    return (
        <div className="otp-group mt-5">
            {Array.from({length: valueLength}, (_, index) => (
                <input
                    key={index}
                    type="text"
                    autoComplete="one-time-code"
                    className="otp-input fs-22 fw-600 h-50px w-50px bg-light-active"
                    value={props.value.length ? props.value[index] : ""}
                    style={{
                        border: "solid 0.5px #e0e0df",
                        borderRadius: "10px",
                        textAlign: "center",
                    }}
                    onChange={(e: any) => {
                        props.onChange(e.target.value, index);
                    }}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        props.onKeyDown(e, index);
                    }}
                    maxLength={1}
                    autoFocus={index === 0}
                    ref={(el: any) => (props.inputRefs.current[index] = el)}
                    name={index.toString()}
                    onPaste={props.onPaste}
                />
            ))}
        </div>
    );
}
