//import Erweima from '/img/p1.png';

class PasswordLogin extends React.Component {
    constructor(props) {
        if (document.cookie.length) {
            var cookieName = document.cookie.split(";")[0].split("=")[1]
            var cookiePw = document.cookie.split(";")[1].split("=")[1]
        }
        super(props)
        this.state = {
            userName: document.cookie.length ? cookieName : '',
            userPassword: document.cookie.length ? cookiePw : '',
            checked: false,
            //mousedown: false,
            showValid: false,
            nameValid: false,
            passwordValid: false,
            blankValid: false,
            lowerCaseValid: false,
            upperCaseValid: false,
            numberValid: false,
            mixlengthValid: false,
        }

        this.handleChange = this.handleChange.bind(this)
        //this.handleMouseOut = this.handleMouseOut.bind(this)
        //this.handleClick = this.handleClick.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.validateField = this.validateField.bind(this)
        this.writeCookie = this.writeCookie.bind(this)

    }

    

    handleChange(event) {
        var target = event.target;
        var value = target.value;
        var name = target.name;
        var partialState = {};
        partialState[name] = value;
        /*this.setState({[name]: value})*/
        target.style.backgroundColor = "whitesmoke"
        this.setState(partialState,
            () => {
                this.validateField(name, value)
            }
        )
    }

    validateField(fieldName, value) {
        let nameOncheck = this.state.nameValid
        let blankOncheck = this.state.blankValid
        let numberOncheck = this.state.numberValid
        let lengthOncheck = this.state.mixlengthValid
        let lowercaseOncheck = this.state.lowerCaseValid
        let uppercaseOncheck = this.state.upperCaseValid
        var reg0 = /^(?=.*\S+)/
        var reg1 = /^(?=.*[a-z])/
        var reg2 = /^(?=.*[A-Z])/
        var reg3 = /^(?=.*[0-9])/
        switch (fieldName) {
            case 'userName':
                nameOncheck = reg0.test(value);
                break;
            case 'userPassword':
                blankOncheck = reg0.test(value)
                lowercaseOncheck = reg1.test(value)
                uppercaseOncheck = reg2.test(value)
                numberOncheck = reg3.test(value)
                lengthOncheck = value.length >= 4
                break;
            default:
                break;

        }

        this.setState({
            showValid: true,
            blankValid: blankOncheck,
            nameValid: nameOncheck,
            lowerCaseValid: lowercaseOncheck,
            upperCaseValid: uppercaseOncheck,
            numberValid: numberOncheck,
            mixlengthValid: lengthOncheck,
            passwordValid: this.state.blankValid && this.state.numberValid && this.state.lowerCaseValid && this.state.upperCaseValid && this.state.mixlengthValid

        })
    }

    /*handleClick(event) {
        !this.state.mousedown ? event.target.style.borderBottomColor = "blue" : event.target.style.borderBottomColor = "whitesmoke"
    }
    handleMouseOut(event) {
        this.state.mousedown ? event.target.style.borderBottomColor = "blue" : event.target.style.borderBottomColor = "whitesmoke"
    }*/

    handleSubmit() {
        (this.state.userName && this.state.userPassword) || (this.state.nameValid && this.state.passwordValid) ? alert("Welcome to eBaoCloud!") : alert("Sorry , fail to login.Please input complete information")
        /*event.preventDefault()*/

    }

    writeCookie(event) {
        this.setState(
            {
                checked: event.target.checked
            });
        var expdate = new Date();
        expdate.setDate(expdate.getDate() + 7);
        if (this.state.nameValid && this.state.passwordValid) {
            document.cookie = ( "userName =" + this.nameInput.value + ";expires=" + expdate.toGMTString() + ";path=/");
            document.cookie = ("userPassword=" + this.pwInput.value + ";expires=" + expdate.toGMTString() + ";path=/");
        }

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="loginForm">
                <span>
                    <input type="text" name="userName" value={this.state.userName}
                           className={this.state.userName ? "cookieText" : "nocookieText"}
                           ref={(input) => {
                               this.nameInput = input;
                           }}
                           placeholder="UserName/Email/Moblie No." onChange={this.handleChange}
                    />
                </span>
                <span>
                    <input type="password" name="userPassword" value={this.state.userPassword}
                           className={this.state.userPassword ? "cookieText" : "nocookieText"}
                           ref={(input) => {
                               this.pwInput = input;
                           }}
                           placeholder="Password" onChange={this.handleChange}
                    />
                </span>
                {this.state.showValid ?
                    <div className="validateField">
                        {!this.state.nameValid ? <p>"User Name/Email/Mobile No." is required</p> : null}
                        {!this.state.blankValid ? <p>Password is required</p> : null}
                        {!this.state.lowerCaseValid ? <p>Password must contain lowercase letters</p> : null}
                        {!this.state.upperCaseValid ? <p>Password must contain uppercase letters</p> : null}
                        {!this.state.numberValid ? <p>Password must contain numbers</p> : null}
                        {!this.state.mixlengthValid ? <p>Length of Password cannot be less than 4</p> : null}
                    </div> : null
                }
                <div>
                    <label onChange={this.writeCookie}>
                        <input type="checkbox" name="rememberMe" checked={this.state.checked} onChange={this.writeCookie}/>
                        Remember Me
                    </label>

                    <input type="submit" value='Sign in' />
                    <a href="#/ForgetPw" onClick={this.props.isForgetPw}> Forget Password?</a>
                </div>
            </form>
        )

    }

}

class CodeLogin extends React.Component {
    render() {
        return (
            <div className="loginForm">

                <p>Open ebaoCloud App to scan QR code</p>
            </div>
        )
    }
}

class ForgetPw extends React.Component {
    render() {
        return (
            <div className="loginForm">
                <h2>Forgot Password</h2>
                <p id="remindMessage">We'll send email to you instructions on how to reset your password.</p>
                <input type="text" name="account" placeholder="Account/Email" className="nocookieText"/>
                <input type="submit" value="Send Email"/>
                <a href="#/LoginUi" onClick={this.props.isForgetPw}>back to Login</a>
            </div>

        )
    }
}
class TabsControl extends React.Component{
    constructor(){
        super();
        this.state={
            currentIndex : 0
        };
    }

    getTitleItemCssClasses(index){
        return index === this.state.currentIndex ? "tab-title-item active" : "tab-title-item";
    }

    getContentItemCssClasses(index){
        return index === this.state.currentIndex ? "tab-content-item active" : "tab-content-item";
    }

    render() {
        var that = this;
        return (
            <div className="">
                <nav className="tab-title-wrap">
                    {React.Children.map(this.props.children, (element, index) => {  //element代表一个元素，可以把一个展示页面tab1当成一个元素
                        return (<div onClick={() => {this.setState({currentIndex: index})}} className={that.getTitleItemCssClasses(index)}>{element.props.name}</div>)

                    })}
                </nav>
                <div className="tab-content-wrap">
                    {React.Children.map(this.props.children,  (element, index) => {
                        return (<div onClick={() => {this.setState({currentIndex: index})}} className={that.getContentItemCssClasses(index)} >{ element }</div>)
                    })}
                </div>
            </div>
        )
    }
}

class LoginUi extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pwloginShow: false    //Go to ForgetPassword
        }
        this.isForgetPw = this.isForgetPw.bind(this)
    }

    isForgetPw() {
        this.setState(
            {pwloginShow: !this.state.pwloginShow}
        )
    }

    render() {
        return (
            <div className="LoginArea">
                {!this.state.pwloginShow ?
                    <TabsControl>
                        <div name="Password Login">
                            <PasswordLogin isForgetPw={this.isForgetPw}/>
                        </div>
                        <div name="QR Code Login">
                            <CodeLogin/>
                        </div>
                    </TabsControl>
                    : null}
                {this.state.pwloginShow ? <ForgetPw isForgetPw={this.isForgetPw}/> : null}
            </div>
        );
    }
}

ReactDOM.render(<LoginUi/>
    , document.getElementById('root'));
