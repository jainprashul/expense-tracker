import Page from '@/components/shared/Page'
import { Button } from '@/components/ui/button'
import { transactionService } from '@/services/expenseService'
import Transaction from '@/types/Transaction'
import moment from 'moment'
import React from 'react'

type Props = {}

const Settings = (_: Props) => {
  
  const [loading, setLoading] = React.useState(false)

  async function exportAllData() {
    // fetch all data from the server
    try {
      setLoading(true)
      // fetch data
      transactionService.getTransactions().then((data) => {
        exportAsCSV(data)
      })
    } catch (error) {
      
    } finally {
      setLoading(false)
    }
    
  }

  return (
    <Page goBack title="Settings">
      <div className="p-4">
        <h1 className="text-lg font-semibold">Backup & Restore</h1>
        <hr className='my-2'/>
        <div className="mt-4 space-y-2">
          <p className='text-gray-400'>Export all your data as CSV</p>
          <Button onClick={exportAllData} >
            Export Data as CSV
          </Button>

          <div className="h-4"></div>

          <p className='text-gray-400'>Import data from CSV</p>
          <Button onClick={importFromCSV} >
            Import Data from CSV
          </Button>
        </div>
      </div>
      {loading && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"> <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div> </div>}
    </Page>
  )
}

export default Settings

function exportAsCSV(data : Transaction[]) {
  let csv = '';

  // Get the headers
  const headers = Object.keys(data[0]);
  csv += headers.join(',') + '\n';

  // Get the data
  data.forEach((row) => {
    csv += Object.entries(row).map(([_, value]) => {
      return value
    }).join(',') + '\n';
  });

  // Download the file
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  const name = `backup-transactions-${moment().format('YYYY-MM-DD')}.csv`;
  a.setAttribute('download', name);
  document.body.appendChild(a); 
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

function parseCSV(text: string) {
  const rows = text.split('\n');
  const headers = rows[0].split(',');
  const data = rows.slice(1).map((row) => {
    const values = row.split(',');
    const obj: any = {};
    headers.forEach((header, i) => {
      obj[header] = values[i]; 
    });
    return obj;
  });
  console.log(data);
}

function importFromCSV() {
  // read the file
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.csv';
  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        parseCSV(text);
        document.body.removeChild(input);
      }
      reader.readAsText(file);
    }
  }

  input.setAttribute('hidden', '');
  document.body.appendChild(input);
  input.click();

}



  