import Product from "../models/ProductModel.js";

// ================# Get Home Page
const getHomePage = async (req, res) => {
    const products = await Product.find().lean();
    
    res.render("index", {
        title: "My | Store",
        products: products.reverse(),
        userId: req.userId ? req.userId.toString() : null
    });
};

// ================# Get Products Page
const getProductsPage = async (req, res) => {
    const user = req.userId ? req.userId.toString() : null;
    const myProducts = await Product.find({user}).populate("user").lean();
    console.log(myProducts);

    res.render("products", {
        title: "Products",
        isProduct: true,
        myProducts
    });
};

// ================# Get One Product
const getOneProduct = async(req, res) => {
    const product = await Product.findById(req.params.id).lean();
    res.render("product", {
        title: "Product",
        product
    });
}



//================# GET Add Product Page
const getAddProductPage = (req, res) => {
    res.render("add", {
        title: "Add Products",
        isAdd: true,
        productError: req.flash("productError")
    });
};

//===============# Add Product
const addProduct = async (req, res) => {
    const {title, price, image, description} = req.body;
    if (!title || !price || !image || !description) {
        req.flash("productError", "All fields required");
        res.redirect("/add");
        return;
    }

    await Product.create({...req.body, user: req.userId});
    res.redirect("/products");
}

// ===============# GET Edit  product Page
const getEditProductPage = async (req, res) => {
    const product = await Product.findById(req.params.id).lean();

    res.render("edit-product", {
        title: "Edit Product",
        product,
        editError: req.flash("editError")
    });
}


// ================# Edit Product
const editProduct = async (req, res) => {
    const {title, price, image, description} = req.body;
    if (!title || !price || !image || !description) {
        req.flash("editError", "All fields required");
        res.redirect(`/edit-product/${req.params.id}`);
        return;
    }

    await Product.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.redirect("/products");
}


// ===============# Delete product
const deleteProduct = async(req, res) => {
    await Product.findByIdAndRemove(req.params.id);
    res.redirect("/");
}

export { 
    getProductsPage, 
    getAddProductPage, 
    getHomePage, 
    addProduct, 
    getOneProduct, 
    getEditProductPage, 
    editProduct,
    deleteProduct
};
