import * as fs from 'fs';

async function parsePdf(): Promise<void> {
    const data = fs.readFileSync('./dummy.pdf');
    const pdfJsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');
    const document = await pdfJsLib.getDocument({
        data: data.buffer, verbosity: 0
    }).promise;

    for (let pageIndex = 1; pageIndex <= document.numPages; pageIndex++) {
        const page = await document.getPage(pageIndex);
        await page.getOperatorList();

        console.log('Loaded commonObjs')
        console.log(page.commonObjs);
    }
}

parsePdf().then(() => {
    console.log('Done');
}).catch(e => console.error(e));


