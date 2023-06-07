import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {
  const getItemData: any = {
    success: true,
    message: "GET request success!",
    data: { requestQueryData: request },
  };

  return NextResponse.json(getItemData);
}

export async function POST(request: Request) {
  console.log(request);
  const postItemData: any = {
    success: true,
    message: "POST request success!",
    data: { requestBodyData: request.body },
  };

  return NextResponse.json({ postItemData });
}
