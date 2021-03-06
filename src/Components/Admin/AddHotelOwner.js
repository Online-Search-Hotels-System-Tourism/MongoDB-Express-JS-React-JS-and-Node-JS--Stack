import React, {Component} from "react";
import axios from 'axios';

class AddHotelOwner extends Component{
    constructor() {
        super();

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePwd = this.onChangePwd.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name:"",
            uName:"",
            email:"",
            pwd:""
        }
    }

    componentDidMount() {
        this.props.changeAdminNavigationStatus(true);

        if(JSON.parse(sessionStorage.getItem('loggedAdmin')) == null){
            this.props.history.push('/admin');
        }
    }

    componentWillUnmount() {
        this.props.changeAdminNavigationStatus(false);
    }

    onChangeName(e) {
        this.setState({name:e.target.value})
    }

    onChangeUsername(e) {
        this.setState({uName:e.target.value})
    }

    onChangeEmail(e) {
        this.setState({email:e.target.value})
    }

    onChangePwd(e) {
        this.setState({pwd:e.target.value})
    }

    onSubmit(e){
        e.preventDefault();

        const {name,uName,email,pwd} = this.state;

        if(name===""||uName===""||email===""||pwd===""){
            alert("All fields are required");
        }else if(pwd.length<8||uName.length<8){
            alert("Username & Password minimum characters 8")
        }else{
            const {uName} = this.state;

            axios.get('http://localhost:4000/store-manager/get-manager/' + uName)
                .then(res => {
                    if(res.data[0].uName === uName) {
                        alert("Username already used")
                    }
                })
                .catch(()=>{
                    const managerObject = {
                        name:this.state.name,
                        uName:this.state.uName,
                        email:this.state.email,
                        pwd:this.state.pwd
                    }

                    axios.post('http://localhost:4000/store-manager/create-store-manager',managerObject)
                        .then(res => console.log(res.data));

                    alert('Store Manager added successful');

                    this.setState({name:'',uName:'',email:'',pwd:''})
                })
        }
    }

    render() {
        return <div className={'col-10 mx-auto col-md-5 mt-4'}>
            <div className={'card card-body my-3'}>
                <h3 className={'text-center mb-5'}>Hotel Owner Register Form</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Hotel Owner Name</label>
                        <input type="text" className="form-control" placeholder="Hotel Owner Name" value={this.state.name} onChange={this.onChangeName}/>
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" placeholder="Username" value={this.state.uName} onChange={this.onChangeUsername}/>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" placeholder="Email" value={this.state.email} onChange={this.onChangeEmail}/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Password" value={this.state.pwd} onChange={this.onChangePwd}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
            </div>
        </div>
    }
}

export default AddHotelOwner;