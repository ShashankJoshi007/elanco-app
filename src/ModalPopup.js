import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "react-bootstrap";

import { kaReducer, PagingPosition, SortingMode, Table } from 'ka-table';
import { hideLoading, showLoading } from "ka-table/actionCreators";


const ModalPopup = ({isModalPopupOpen, appName, handleClose, columns, typeOfCall}) => {

    const [appDetails, setAppDetails] = useState([])

    const [option, changeOptions] = useState({
        loading: {
            enabled: false,
            text: 'Loading data'
        },
        paging: {
            enabled: true,
            pageIndex: 0,
            pageSize: 10,
            pageSizes: [5, 10, 15],
            position: PagingPosition.Bottom
          }
        })
        const dispatch  = (action) => {
            changeOptions((prevState) => kaReducer(prevState, action));
        };

        const bootstrapChildComponents = {
            table: {
              elementAttributes: () => ({
                className: 'table table-striped table-hover table-bordered',
              }),
            },
            tableHead: {
                elementAttributes: () => ({
                  className: 'thead-dark'
                })
              },
        }

    useEffect(() => {
        const fetchAppDetails = () => {
            dispatch(showLoading())
            axios.get(`https://engineering-task.elancoapps.com/api/${window.location.pathname.slice(1)}/${appName}`).then((response) => {
                const result = response.data
                result.forEach((item, index) => {
                    item['id'] = index + 1
                })
                dispatch(hideLoading())
                console.log(result)
                setAppDetails(result)
            })
        }
        fetchAppDetails()
    } , [])

    return(
    <Modal show={isModalPopupOpen} dialogClassName="modal-90w">
        <ModalHeader>
            <ModalTitle>{appName}</ModalTitle>
        </ModalHeader>
        <ModalBody>
            <Table 
                height={600}
                columns = {columns}
                data={appDetails}
                sortingMode = {SortingMode.Single}
                rowKeyField={'id'}
                dispatch={dispatch}
                childComponents = {bootstrapChildComponents}
                format={({column, value}) => {
                    if(column.key === "Tags"){
                        return (<ul>
                                <li>{value['app-name']}</li>
                                <li>{value['business-unit']}</li>
                                <li>{value['environment']}</li>
                            </ul>)
                    }
                }}
                {...option}
            />
        </ModalBody>
        <ModalFooter>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
        </ModalFooter>
    </Modal>
    )
}



export default ModalPopup;