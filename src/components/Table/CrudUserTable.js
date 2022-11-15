import React, { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

import "./CrudUserTable.css";

const DataTableCrudDemo = () => {
  let emptyPost = {
    body: "",
    description: "",
    title: "",
  };

  const [posts, setPosts] = useState(null);
  const [httpError, setHttpError] = useState();
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [post, setPost] = useState(emptyPost);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  const postMethod = async () => {
    await fetch(
      "https://mnr-users-http-default-rtdb.europe-west1.firebasedatabase.app/Users.json",
      {
        method: "POST",
        body: JSON.stringify(post),
        headers: { "Content-Type": "application/json" },
      }
    );
    fetchUsers();
  };

  const putMethod = async () => {
    const postData = post;

    try {
      const response = await fetch(
        "https://mnr-users-http-default-rtdb.europe-west1.firebasedatabase.app/Users/" + post.id + ".json",
        {
          method: "PUT",
          body: JSON.stringify(postData),
          headers: {
            "Accept" : "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Could not update data!");
      }
    } catch (error) {
      setHttpError(error.message);
    }
    fetchUsers();
  };

  const deleteMethod = async () => {
    const postData = post;

    try {
      const response = await fetch(
        "https://mnr-users-http-default-rtdb.europe-west1.firebasedatabase.app/Users/" + post.id + ".json",
        {
          method: "DELETE",
          body: JSON.stringify(postData),
          headers: {
            "Accept" : "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Could not update data!");
      }
    } catch (error) {
      setHttpError(error.message);
    }
    fetchUsers();
  };

  const deleteSelectedMethod = async (_posts) => {
    const postData = _posts;

    try {
      const response = await fetch(
        "https://mnr-users-http-default-rtdb.europe-west1.firebasedatabase.app/Users/" + postData + ".json",
        {
          method: "DELETE",
          body: JSON.stringify(postData),
          headers: {
            "Accept" : "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Could not update data!");
      }
    } catch (error) {
      setHttpError(error.message);
    }
    console.log(postData);
    fetchUsers();
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://mnr-users-http-default-rtdb.europe-west1.firebasedatabase.app/Users.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      const loadedUsers = [];

      for (const key in responseData) {
        loadedUsers.push({
          id: key,
          title: responseData[key].title,
          body: responseData[key].body,
          description: responseData[key].description,
        });
      }

      setPosts(loadedUsers);
    } catch (error) {
      setHttpError(error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openNew = () => {
    setPost(emptyPost);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const saveProduct = () => {
    setSubmitted(true);

    if (post.title.trim()) {
      // let _posts = [...posts];
      // let _post = { ...post };
      if (post.id) {
        
        putMethod();
        
        // const index = findIndexById(post.id);
        // _posts[index] = _post;
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "User Updated",
          life: 3000,
        });
      } else {
        
        postMethod();
        // _post.id = createId();
        // _posts.push(_post);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "User Created",
          life: 3000,
        });
      }
      
      
      
      
      // setPosts(_posts);
      setProductDialog(false);
      setPost(emptyPost);
    }
    
  };

  const editProduct = (post) => {
    setPost({ ...post });
    setProductDialog(true);
  };

  const confirmDeleteProduct = (post) => {
    setPost(post);
    setDeleteProductDialog(true);
  };

  const deleteProduct = () => {
    deleteMethod();
    // debugger;
    // axios.delete(
    //   "https://mnr-users-http-default-rtdb.europe-west1.firebasedatabase.app/Users.json" +
    //     "/" +
    //     post.id +
    //     post
    // );
    // debugger;
    // let _posts = posts.filter((val) => val.id !== post.id);
    // setPosts(_posts);
    setDeleteProductDialog(false);
    setPost(emptyPost);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "User Deleted",
      life: 3000,
    });
    fetchUsers();
  };


  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

  const deleteSelectedProducts = () => {
    let _posts = posts.filter((val) => !selectedProducts.includes(val));
    deleteSelectedMethod(_posts);
    // setPosts(_posts);
    // console.log(_posts);
    setDeleteProductsDialog(false);
    setSelectedProducts(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Users Deleted",
      life: 3000,
    });
  };

  const onCategoryChange = (e) => {
    let _post = { ...post };
    _post["body"] = e.value;
    setPost(_post);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _post = { ...post };
    _post[`${name}`] = val;

    setPost(_post);
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="New"
          icon="pi pi-plus"
          className="p-button-success mr-2"
          onClick={openNew}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedProducts || !selectedProducts.length}
        />
      </React.Fragment>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Manage Users</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );
  const productDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveProduct}
      />
    </React.Fragment>
  );
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteProduct}
      />
    </React.Fragment>
  );
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedProducts}
      />
    </React.Fragment>
  );

  return (
    <div className="datatable-crud-demo">
      <Toast ref={toast} />

      <div className="card">
        <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

        <DataTable
          ref={dt}
          value={posts}
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          scrollable
          scrollHeight="500px"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
          globalFilter={globalFilter}
          header={header}
          responsiveLayout="scroll"
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
            exportable={false}
          ></Column>
          <Column
            field="id"
            header="ID"
            sortable
            style={{ minWidth: "15rem" }}
          ></Column>
          <Column
            field="title"
            header="Nome"
            sortable
            style={{ minWidth: "14rem" }}
          ></Column>
          <Column
            field="body"
            header="Sede"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="description"
            header="Descrizione"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "10rem" }}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={productDialog}
        style={{ width: "450px" }}
        header="Dettagli Utente"
        modal
        className="p-fluid"
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        {post.image && (
          <img
            src={`images/product/${post.image}`}
            onError={(e) =>
              (e.target.src =
                "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
            }
            alt={post.image}
            className="product-image block m-auto pb-3"
          />
        )}
        <div className="field">
          <label htmlFor="title">Nome</label>
          <InputText
            id="title"
            value={post.title}
            onChange={(e) => onInputChange(e, "title")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !post.title })}
          />
          {submitted && !post.name && (
            <small className="p-error">Name is required.</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="description">Descrizione</label>
          <InputTextarea
            id="description"
            value={post.description}
            onChange={(e) => onInputChange(e, "description")}
            required
            rows={3}
            cols={20}
          />
        </div>

        <div className="field">
          <label className="mb-3">Sede</label>
          <div className="formgrid grid">
            <div className="field-radiobutton col-6">
              <RadioButton
                inputId="sede1"
                name="sede"
                value="Palazzo Altemps"
                onChange={onCategoryChange}
                checked={post.body === "Palazzo Altemps"}
              />
              <label htmlFor="sede1">Palazzo Altemps</label>
            </div>
            <div className="field-radiobutton col-6">
              <RadioButton
                inputId="sede2"
                name="sede"
                value="Palazzo Massimo"
                onChange={onCategoryChange}
                checked={post.body === "Palazzo Massimo"}
              />
              <label htmlFor="sede2">Palazzo Massimo</label>
            </div>
            <div className="field-radiobutton col-6">
              <RadioButton
                inputId="sede3"
                name="sede"
                value="Crypta Balbi"
                onChange={onCategoryChange}
                checked={post.body === "Crypta Balbi"}
              />
              <label htmlFor="sede3">Crypta Balbi</label>
            </div>
            <div className="field-radiobutton col-6">
              <RadioButton
                inputId="sede4"
                name="sede"
                value="Via Gaeta"
                onChange={onCategoryChange}
                checked={post.body === "Via Gaeta"}
              />
              <label htmlFor="sede4">Via Gaeta</label>
            </div>
          </div>
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {post && (
            <span>
              Are you sure you want to delete <b>{post.title}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductsDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteProductsDialogFooter}
        onHide={hideDeleteProductsDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {post && (
            <span>Are you sure you want to delete the selected users?</span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default DataTableCrudDemo;
