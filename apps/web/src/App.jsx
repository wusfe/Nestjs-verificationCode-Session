import { useState } from "react";
import "./App.css";

const baseUrl = "http://localhost:3000";
function HelloWorld() {
  const [url, setUrl] = useState(baseUrl + "/getCaptcha");
  const [val, setVal] = useState("");
  const handleImageClick = () => {
    setUrl(baseUrl + "/getCaptcha" + "?" + new Date().getTime());
  };

  const handleSubmit = async () => {
    if (!val) {
      alert("请输入验证码");
      return;
    }
    try {
      let d = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          captcha: val,
        }),
      })


      if(!d.ok){
        throw await d.json()
      }else {
        alert("登录成功");
      }
      
      
    } catch (error) {
      console.log(error, 'error');

      alert(error.message);
    }
  };
  return (
    <div>
      <img src={url} alt="" onClick={handleImageClick} />

      <div>
        <label htmlFor="Ca">验证码:</label>
        <input
          id="Ca"
          type="text"
          value={val}
          onChange={(e) => {
            setVal(e.target.value);
          }}
        />
      </div>
      <div>
        <button onClick={handleSubmit}>登录</button>
      </div>
    </div>
  );
}
function App() {
  return <HelloWorld />;
}

export default App;
