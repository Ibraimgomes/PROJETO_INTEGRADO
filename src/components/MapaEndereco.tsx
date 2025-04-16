// Componente MapaEndereco.tsx com Leaflet
'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface MapaEnderecoProps {
    endereco: string;
    setEndereco: (valor: string) => void;
}

// Ícone personalizado para o marcador
const markerIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

function Localizador({ onSelect }: { onSelect: (lat: number, lng: number) => void }) {
    useMapEvents({
        click(e) {
            onSelect(e.latlng.lat, e.latlng.lng);
        }
    });
    return null;
}

export default function MapaEndereco({ endereco, setEndereco }: MapaEnderecoProps) {
    const [posicao, setPosicao] = useState<[number, number]>([-3.119, -60.0212]); // Ex: Manaus
    const [carregandoEndereco, setCarregandoEndereco] = useState(false);

    async function buscarEndereco(lat: number, lng: number) {
        setCarregandoEndereco(true);
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
            const data = await res.json();
            if (data.display_name) {
                setEndereco(data.display_name);
            }
        } catch (err) {
            console.error('Erro ao buscar endereço:', err);
        } finally {
            setCarregandoEndereco(false);
        }
    }

    const selecionarLocal = (lat: number, lng: number) => {
        setPosicao([lat, lng]);
        buscarEndereco(lat, lng);
    };

    return (
        <div className="space-y-2">
            <p className="text-sm text-gray-600">
                Clique no mapa para selecionar a localização. O endereço será preenchido automaticamente.
            </p>
            <MapContainer
                center={posicao}
                zoom={15}
                scrollWheelZoom={true}
                className="w-full h-64 rounded z-0"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={posicao} icon={markerIcon} />
                <Localizador onSelect={selecionarLocal} />
            </MapContainer>
            <input
                type="text"
                value={endereco}
                readOnly
                placeholder="Endereço selecionado..."
                className="input w-full"
            />
            {carregandoEndereco && <p className="text-xs text-gray-500">Buscando endereço...</p>}
        </div>
    );
}
