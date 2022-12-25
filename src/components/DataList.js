import React, {useState, useEffect} from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css'
import paginationFactory from 'react-bootstrap-table2-paginator'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css'
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter'
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css'

function DataList() {
  const [userList, setUserList] = useState([])
  const [limit] = useState(100)

  // Content Display Modifiers
  const columns = [
    {dataField:'name', text:'Name', sort: true, filter: textFilter()},
    {dataField:'email', text:'Email', sort: true, filter: textFilter()},
    {dataField:'body', text:'Comment', sort: true, filter: textFilter()},
    //{dataField:'established', text:'Established Year', sort: true, filter: textFilter()}
  ]

  // Pagination modifiers
  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 5,
    lastPageText: '>>',
    firstPageText: '<<',
    nextPageText: '>',
    prePageText: '<',
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
      console.log('page', page)
      console.log('sizePerPage', sizePerPage)
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log('page', page)
      console.log('sizePerPage', sizePerPage)
    },
  })

  //URL list
  // https://api.instantwebtools.net/v1/passenger?page=0&size=10
  // https://api.instantwebtools.net/v1/airlines
  // https://jsonplaceholder.typicode.com/comments

  // Fetch REST API URL
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/comments?_limit=${limit}`)
    .then(response => response.json())
    .then(result => setUserList(result))
    .catch(error => console.log(error))
  },[])

  // Content
  return (
    <div>
      <BootstrapTable 
      bootstrap4 
      keyField='id' 
      columns={columns} 
      data={userList} 
      pagination={pagination}
      filter={filterFactory()}
      />
    </div>
  )
}

export default DataList