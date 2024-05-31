// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import PDF from '../../components/PDF/PDF';
import PDFLayout from '../../components/PDF/PDFLayout';
import pdfHelper from '../../services/pdfHelper';

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = req.body;
  const buffer = await pdfHelper.componentToPDFBuffer(
    <PDFLayout>
      <PDF data={data}/>
    </PDFLayout>
  );

  // with this header, your browser will prompt you to download the file
  // without this header, your browse will open the pdf directly
  res.setHeader('Content-disposition', 'attachment; filename="transactions.pdf');
  
  // set content type
  res.setHeader('Content-Type', 'application/pdf');

  // output the pdf buffer. once res.end is triggered, it won't trigger the render method
  res.end(buffer);
}
