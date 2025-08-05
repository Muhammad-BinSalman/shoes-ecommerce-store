import { google } from 'googleapis';
import { NextResponse } from 'next/server';

// Define TypeScript interfaces
interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderData {
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: OrderItem[];
  codFee: number;
  total: number;
}

export async function POST(request: Request) {
  try {
    const orderData: OrderData = await request.json();
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID!;
    const sheetName = 'Orders';

    // 1. Check if sheet exists and create if needed
    try {
      await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${sheetName}!A1`,
      });
    } catch (error) {
      console.log('Sheet not found, creating new sheet...');
      
      // Create new sheet
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [{
            addSheet: {
              properties: {
                title: sheetName
              }
            }
          }]
        }
      });
    }

    // 2. Check if headers exist
    let headersExist = true;
    try {
      const headerRes = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${sheetName}!A1:I1`,
      });
      
      headersExist = !!headerRes.data.values && headerRes.data.values.length > 0;
    } catch (error) {
      headersExist = false;
    }

    // 3. Create headers if needed
    if (!headersExist) {
      console.log('Creating headers...');
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${sheetName}!A1:I1`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [
            [
              'Timestamp',
              'Name',
              'Email',
              'Phone',
              'Address',
              'Products',
              'Total Items',
              'COD Fee',
              'Grand Total',
              'Image URL'
            ]
          ]
        }
      });
    }

    // 4. Prepare and append data
    const values = [
      [
        new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' }),
        orderData.customer.name,
        orderData.customer.email,
        orderData.customer.phone,
        orderData.customer.address,
        orderData.items.map(item => 
          `${item.name} (${item.quantity} × PKR ${item.price})`
        ).join(', '),
        orderData.items.reduce((sum, item) => sum + item.quantity, 0),
        `PKR ${orderData.codFee}`,
        `PKR ${orderData.total}`,
        orderData.items.map(item => item.image).join(', ')
      ]
    ];

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:I`,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values },
    });

    return NextResponse.json({ 
      success: true,
      updatedRange: response.data.updates?.updatedRange
    }, { status: 200 });

  } catch (error: any) {
    console.error('Full error details:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process order', 
        message: error.message,
        details: error.response?.data || error.errors
      },
      { status: 500 }
    );
  }
}