import { CognitoUserPool } from 'amazon-cognito-identity-js';

//test
/*const poolData = {
    UserPoolId: 'ap-south-1_j5dQKEw4r',
    ClientId: '6p89asc9gsjbrkmknips8lbvgq'
};*/

//test2
const poolData = {
    UserPoolId: 'ap-south-1_PeVFpe0LR',
    ClientId: '7f17q6ohet33m44g0a7u26n7o8'
};

export default new CognitoUserPool(poolData);