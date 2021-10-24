import React, {useEffect, useState} from 'react';
import './App.css';
import Select from 'react-select'



type SelectOption = {
    label: string
    value: string
}
function App() {
    const [ticker, setTicker] = useState('')
    const [data, setData] = useState({})

    const options = [
        { value: 'BTC', label: 'Bitcoin' },
        { value: 'ETH', label: 'Etherium' },
    ]
    const isSelectOption = (v: any): v is SelectOption => {
        if((v as SelectOption).value !== undefined) return v.value
        return false
    }

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        fetch('http://localhost:5000/crypto/v1/recommendations?ticker='+ticker, {
            method: 'GET',
            headers:{
                "Content-type":"application/json"
            }
        }).then(response => response.json()).then(message => setData(message))
    }


    // const handleSubmit = async (event: { preventDefault: () => void; }) => {
    //     event.preventDefault();
    //     const response = await fetch("https://reqres.in/api/users?page=3");
    //     const json = await response.json();
    //     const results = json.data.map(el => {
    //         return {
    //             slug: el.id,
    //             name: el.first_name + ' ' + el.last_name
    //         }
    //     });
    //     setData(results)
    // }

    useEffect(() => {
        console.log(data)
        // alert(data)
    },[data])



    return (
        <form onSubmit={handleSubmit}>
            <div className="App">
                <header className="App-header">
                    <div>
                        <Select
                            options={options}
                            onChange={(v) => {
                                if(isSelectOption(v)) {
                                    setTicker(v.value)
                                }
                            }}
                        />
                        <button type="submit">Submit</button>
                    </div>
                </header>
            </div>

        </form>
  );
}

export default App;
