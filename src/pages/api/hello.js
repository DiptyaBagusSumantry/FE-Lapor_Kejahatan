import request from "../utils/request";
class api {

    static urlAPI() {
        return process.env.NEXT_PUBLIC_API_BASE_URL
    }
    static Register(data) {
        let path = `register`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'POST',
            data
        })
    }
    // Fetch User
    static GetFetch(token) {
      let path = `fetch`;
      return request(`${this.urlAPI()}${path}`, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`
          }
      })
    }

    static GetJenisKejahatan(token) {
      let path = `kejahatan`;
      return request(`${this.urlAPI()}${path}`, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`
          }
      })
    }

    static GetHeaderDashboard(token) {
      let path = `header`;
      return request(`${this.urlAPI()}${path}`, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`
          }
      })
    }
    // Admin : Laporan Kejahatan
    static GetLaporanKejahatanAdmin(token) {
        let path = `laporan-kejahatan`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
    static DeleteLaporanKejahatan(token, id) {
        let path = `laporan-kejahatan/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }
    static GetLaporanKejahatanById(token, id) {
        let path = `laporan-kejahatan/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
    static UpdateLaporanKejahatan(token, data, id) {
        let path = `laporan-kejahatan/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'PUT',
            data,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }
    static CreateLaporan(token, data) {
        let path = `laporan-kejahatan`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'POST',
            data,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }
    static CetakLaporan( data) {
        let path = `check-laporan`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'POST',
            data,
        })
    }
    static CreateBalasLaporan(token, data) {
        let path = `progress-laporan`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'POST',
            data,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }
    static UpdateStatusLaporan(token, data, id) {
        let path = `progress-laporan/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'PUT',
            data,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }
    

    // 
    static GetKejahatanAdmin(token) {
      let path = `kejahatan`;
      return request(`${this.urlAPI()}${path}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
      })
    }

    // Berita
    static GetBerita(token) {
        let path = `berita`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
    static GetBeritaById(token, id) {
        let path = `berita/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
    static CreateBerita(token, data) {
        let path = `berita`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'POST',
            data,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    static UpdateBerita(token, data, id) {
        let path = `berita/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'PUT',
            data,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    static DeleteBerita(token, id) {
        let path = `berita/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }


    // Pemetaan Lokasi
    static GetBatasArea(token) {
        let path = `batas-area`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
    

    
    
    
    
  }

export default api