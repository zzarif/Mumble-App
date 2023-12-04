import React, { useEffect, useState } from "react";
import styles from "./basic.module.css";
import { MenuItem, Select, TextField } from "@mui/material";
import { methods } from "../../constants/methods";

const BasicDetails = ({
  categoryId,
  setCategoryId,
  skuCode,
  setSkuCode,
  itemCode,
  setItemCode,
  uomId,
  setUomId,
  quantity,
  setQuantity,
  size,
  setSize,
  searchDesc,
  setSearchDesc,
  description,
  setDescription,
}) => {
  useEffect(() => {
    loadCategoryList();
    loadUOMList();
  }, []);

  // fetch category list
  const [categoryList, setCategoryList] = useState([]);
  const loadCategoryList = async () => {
    const url = new URL(import.meta.env.VITE_API_BASE_URL
      +import.meta.env.VITE_API_ALL_CATEGORIES);
    url.searchParams.append("page",1);
    url.searchParams.append("page_size",100);
    await fetch(url, {
      method: methods.GET,
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((obj) => {
        setCategoryList(obj.data);
      });
  };

  // fetch UOM list
  const [uomList, setUomList] = useState([]);
  const loadUOMList = async () => {
    const url = new URL(import.meta.env.VITE_API_BASE_URL
      +import.meta.env.VITE_API_ALL_UOM);
    url.searchParams.append("all",1);
    await fetch(url, {
      method: methods.GET,
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((obj) => {
        setUomList(obj.data);
      });
  };

  return (
    <div className={styles.box}>
      <div className={styles.title}>Basic Details</div>
      {/* row 0 */}
      <div className={styles.row}>
        <div className={styles.column}>
          <p>Category</p>
          <Select
            fullWidth
            value={categoryId}
            sx={{ borderRadius: "0.8rem" }}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            {categoryList.map((category) => (
              <MenuItem value={category.nCategoryID}>
                {category.strCategoryDesc}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>

      {/* row 1 */}
      <div className={styles.row}>
        <div className={styles.column}>
          <p>SKU Code</p>
          <TextField
            fullWidth
            value={skuCode}
            onChange={(e) => setSkuCode(e.target.value)}
            InputProps={{ style: { borderRadius: "0.8rem" } }}
            placeholder="1001"
            type="number"
          />
        </div>
        <div className={styles.column}>
          <p>Item Code</p>
          <TextField
            fullWidth
            value={itemCode}
            onChange={(e) => setItemCode(e.target.value)}
            InputProps={{ style: { borderRadius: "0.8rem" } }}
            placeholder="1001"
            type="number"
          />
        </div>
      </div>

      {/* row 2 */}
      <div className={styles.row}>
        <div className={styles.column}>
          <p>UOM</p>
          <Select
            fullWidth
            value={uomId}
            sx={{ borderRadius: "0.8rem" }}
            onChange={(e) => setUomId(e.target.value)}
          >
            {uomList.map((uom) => (
              <MenuItem value={uom.nUOM}>{uom.strUOMDesc}</MenuItem>
            ))}
          </Select>
        </div>
        <div className={styles.column}>
          <p>Quantity</p>
          <TextField
            fullWidth
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            InputProps={{ style: { borderRadius: "0.8rem" } }}
            placeholder="0"
          />
        </div>
      </div>

      {/* row 3 */}
      <div className={styles.row}>
        <div className={styles.column}>
          <p>Size</p>
          <Select
            fullWidth
            value={size}
            sx={{ borderRadius: "0.8rem" }}
            onChange={(e) => setSize(e.target.value)}
          >
            <MenuItem value="S">S</MenuItem>
            <MenuItem value="M">M</MenuItem>
            <MenuItem value="L">L</MenuItem>
            <MenuItem value="XL">XL</MenuItem>
            <MenuItem value="XXL">XXL</MenuItem>
            <MenuItem value="XXXL">XXXL</MenuItem>
            
          </Select>
        </div>
        <div className={styles.column}>
          <p>Search Description</p>
          <TextField
            fullWidth
            value={searchDesc}
            onChange={(e) => setSearchDesc(e.target.value)}
            InputProps={{ style: { borderRadius: "0.8rem" } }}
            placeholder="Heineken Bot"
          />
        </div>
      </div>

      {/* row 4 */}
      <div className={styles.row}>
        <div className={styles.column}>
          <p>Description</p>
          <TextField
            fullWidth
            multiline
            maxRows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            InputProps={{ style: { borderRadius: "0.8rem" } }}
            placeholder="Heineken Bot"
          />
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;
