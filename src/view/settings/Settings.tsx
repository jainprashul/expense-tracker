import Page from '@/components/shared/Page'
import { Button } from '@/components/ui/button'
import { transactionService } from '@/services/expenseService'
import Transaction from '@/types/Transaction'
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
    <Page title="Settings">
      <div className="p-4">
        <h1 className="text-2xl font-semibold">Settings</h1>

        <div className="mt-4">
          <Button onClick={exportAllData} >
            Export Data as CSV
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
    console.log(row)
    csv += Object.entries(row).map(([key, value]) => {
      console.log(key, value)
      return value
    }).join(',') + '\n';
  });

  // Download the file
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  a.setAttribute('download', 'data.csv');
  document.body.appendChild(a); 
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

  