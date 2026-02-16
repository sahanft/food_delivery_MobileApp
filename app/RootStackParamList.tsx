export type RootStackParamList = {
    Splash: undefined;
    Login: undefined;
    SignUp: undefined;
    Main: undefined;
    CartScreen: undefined;
    AddOrderDetails: undefined;
    FoodDetails: { foodData: any };
    OrderHistory: { totalPrice: number; address: string; phoneNumber: string };
    EditItemScreen: { itemData: any };
    EditOrderScreen: { orderData: any };
};
