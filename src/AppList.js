import axios from "axios"
import { DataType, SortingMode } from "ka-table"
import { useState, useEffect } from "react"
import { Container, ListGroup, ListGroupItem } from "react-bootstrap"
import ModalPopup from "./ModalPopup"



const AppList = ({componentName}) => {

    const [applicationsList, setApplicationsList] = useState(null)
    const [isModalPopupOpen, setModalPopup] = useState(false)
    const [appName, setAppName] = useState('')

    const columns = [
        { key: 'ConsumedQuantity', title: 'Consumed Quantity', dataType: DataType.String },
        { key: 'Cost', title: 'Cost', dataType: DataType.String },
        { key: 'Date', title: 'Date', dataType: DataType.String },
        { key: 'InstanceId', title: 'Instance Id', dataType: DataType.String, width: 350 },
        { key: 'MeterCategory', title: 'Meter Category', dataType: DataType.String },
        { key: 'ResourceGroup', title: 'Resource Group', dataType: DataType.String },
        { key: 'ResourceLocation', title: 'Resource Location', dataType: DataType.String },
        { key: 'Tags', title: 'Tags', dataType: DataType.Object, width: 200 },
        { key: 'UnitOfMeasure', title: 'Unit Of Measure', dataType: DataType.String },
        { key: 'Location', title: 'Location', dataType: DataType.String },
        { key: 'ServiceName', title: 'Service Name', dataType: DataType.String },
      ]

    

    useEffect(() => {
        const fetchApplicationList = async () => {
            if(window.location.pathname === "/applications"){
                await axios.get('https://engineering-task.elancoapps.com/api/applications').then((response) => setApplicationsList(response.data))
            }else{
                await axios.get('https://engineering-task.elancoapps.com/api/resources').then((response) => setApplicationsList(response.data))
            }
        }
        fetchApplicationList()
    }, [window.location.pathname])

    const handleClose = () => {
        setModalPopup(false)
    }

    return (
        <div>
            <div>
                <h5>Welcome to {componentName}!!! </h5>

            </div>
            <Container style={{height: 600, overflowY: 'auto', marginTop: 20}}>
                {
                    !applicationsList ? <div>Loading...</div> :
                        <ListGroup as="ul">
                            {
                                applicationsList.length !== 0 ? applicationsList.map((item, index) => <ListGroupItem as={"li"} action style={{ cursor: 'pointer' }} key={index} onClick={() => {
                                    setAppName(item)
                                    setModalPopup(true)
                                    //fetchAppDetails(item)
                                }}>{item}</ListGroupItem>) : ''
                            }
                        </ListGroup>
                }
            </Container>

            {isModalPopupOpen && <ModalPopup isModalPopupOpen={isModalPopupOpen} handleClose={handleClose} appName={appName} columns={columns} />}
        </div>
    )
}

export default AppList