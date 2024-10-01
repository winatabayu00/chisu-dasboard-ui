import React from 'react';
import Chart from 'react-apexcharts';

interface BarChartProps {
    series: { name: string; data: number[] }[];
    categories: string[];
    colors: string;
    sasaranOption?: null | string;
    layananOption?: null | string;
}

// Mapping for sasaranOption labels
const sasaranLabels: { [key: string]: string } = {
    'ibu_hamil': 'Ibu Hamil',
    'ibu_bersalin': 'Ibu Bersalin',
    'bayi_baru_lahir': 'Bayi Baru Lahir',
    'bayi_dibawah_6_bulan': 'Bayi Dibawah 6 Bulan',
    'bayi': 'Bayi',
    'anak_usia_12_sampai_23_bulan': 'Anak Usia 12 Sampai 23 Bulan',
    'balita': 'Balita',
    'anak_usia_sekolah': 'Anak Usia Sekolah',
    'usia_dewasa': 'Usia Dewasa',
};

// Mapping for layananOption labels
const layananLabels: { [key: string]: string } = {
    'KUNJUNGAN_ANC_6': 'Kunjungan ANC K6',
    'persalinan_di_fasilitas_kesehatan': 'Persalinan di Fasilitas Kesehatan',
    'kunjungan_nifas_lengkap': 'Kunjungan Nifas Lengkap',
    'kunjungan_neonatal_lengkap': 'Kunjungan Neonatal Lengkap',
    'skrining_hipotiroid_kongenial': 'Skrining Hipotiroid Kongenial',
    'asi_ekslusif': 'ASI Ekslusif',
    'imunisasi_dasar_lengkap': 'Imunisasi Dasar Lengkap',
    'imunisasi_lanjutan_baduta_lengkap': 'Imunisasi Lanjutan Baduta Lengkap',
    'pemberian_vitamin_a': 'Pemberian Vit. A',
    'layanan_tumbuh_kembang': 'Layanan Tumbuh Kembang',
    'imunisasi_lanjutan_lengkap': 'Imunisasi Lanjutan Lengkap',
    'skrining_kesehatan': 'Skrining Kesehatan',
    'skrining_anemia': 'Skrining Anemia',
    'konsumsi_tablet_tabel_darah': 'Konsumsi Tablet Tabel Darah',
    'pasien_hipertensi': 'Pasien Hipertensi',
};

const BarChart: React.FC<BarChartProps> = ({ series, categories, colors, sasaranOption, layananOption }) => {
    // Get the label for sasaranOption
    const sasaranLabel = sasaranOption ? sasaranLabels[sasaranOption] || sasaranOption : '';
    // Get the label for layananOption
    const layananLabel = layananOption ? layananLabels[layananOption] || layananOption : '';

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6" style={{ width: '100%', height: '100%' }}>
            <p className="flex justify-center text-lg font-bold">
                {sasaranLabel} {layananLabel ? `| ${layananLabel}` : ''}
            </p>
            <div className="flex justify-center">
                <Chart
                    series={series}
                    type="bar"
                    style={{ width: '100%', height: '100%' }}
                    height={`200%`}
                    width={`100%`}
                    options={{
                        chart: { type: 'bar' },
                        plotOptions: {
                            bar: { horizontal: false, columnWidth: '55%', endingShape: 'rounded' }
                        },
                        xaxis: { categories },
                        yaxis: { title: { text: 'Jumlah' } },
                        tooltip: {
                            y: { formatter: (val: number) => `${val} layanan` }
                        },
                        colors: [colors],
                    }}
                />
            </div>
        </div>
    );
};

export default BarChart;
