import { convertToSlug } from '@/actions/convertAction';
import { axiosHandler } from '@/api/httpClient';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import ProductAPI from './product.api';
const getListProductAction = createAsyncThunk("product/getListProductAction", async () => {
    const { isSuccess, data } = await axiosHandler(() =>
        ProductAPI.getListProduct()
    );
    if (isSuccess) {
        return data;
    }
    return null;
});

const getProductAction = createAsyncThunk("product/getProductAction", async (id: string) => {
    const { isSuccess, data } = await axiosHandler(() =>
        ProductAPI.getProduct(id)
    );
    if (isSuccess) {
        return data;
    }
    return null;
});

const converDataExcelToProductObj = (data: any, createdby: string) => {
    const listProduct: any[] = [];
    data.forEach((item: any) => {
        let jsonObject = {} as any;
        let jsonName = {} as any;
        let jsonDescription = {} as any;
        let jsonAmount = {} as any;
        let slug: string = '';
        Object.getOwnPropertyNames(item).forEach((propname) => {
            if (propname !== '__rowNum__' && propname !== null && propname !== undefined && propname !== '' && !propname.startsWith('__EMPTY')) {
                if (propname === 'no' ||
                    propname === 'index' ||
                    propname === 'code' ||
                    propname === 'catalog_detail' ||
                    propname === 'promotion' ||
                    propname === 'ribbons' ||
                    propname === 'question' ||
                    propname === 'favorite' ||
                    propname === 'size' ||
                    propname === 'weight' ||
                    propname === 'mix' ||
                    propname === 'meta_keywords_en' ||
                    propname === 'meta_keywords_vn' ||
                    propname === 'title_meta_seo' ||
                    propname === 'description_meta_seo'
                ) {
                    jsonObject[propname] = item[propname];
                }
                else if (propname === 'name_en') {
                    jsonName['en_US'] = item[propname];
                    slug = convertToSlug(item[propname])
                }
                else if (propname === 'name_vn') {
                    jsonName['vn_VN'] = item[propname];
                }
                else if (propname === 'description_en') {
                    jsonDescription['en_US'] = item[propname];
                }
                else if (propname === 'description_vn') {
                    jsonDescription['vn_VN'] = item[propname];
                }
            }
        })
        jsonObject['id'] = uuidv4() as string
        if (!jsonObject['images']) jsonObject['images'] = '';
        if (!jsonObject['thumbnail']) jsonObject['thumbnail'] = '';
        jsonObject['slug'] = slug;

        jsonAmount['en_US'] = 0;
        jsonAmount['vn_VN'] = 0;
        jsonObject['amount'] = jsonAmount;

        jsonObject['name'] = jsonName;
        jsonObject['description'] = jsonDescription;
        jsonObject['createdby'] = createdby;
        jsonObject['isActive'] = true;
        jsonObject['isshowhome'] = false;
        listProduct.push(jsonObject)
    })
    console.log(listProduct)
    return listProduct;
};

export { converDataExcelToProductObj, getListProductAction, getProductAction };