import { empresaService } from "@/app/services/empresaService";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export function AddEmpresaModal({
  isOpen,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (empresa: Omit<Empresa, "id">) => void;
}) {
  const [empresa, setEmpresa] = useState<Omit<Empresa, "id">>({
    razao_social: "",
    cnpj: "",
    cep: "",
    cidade: "",
    estado: "",
    bairro: "",
    complemento: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmpresa((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await empresaService.create(empresa);

      onSave(data); // Atualiza a lista
      onClose();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Modal show={isOpen} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Adicionar Nova Empresa</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Razão Social</Form.Label>
                <Form.Control
                  type="text"
                  name="razao_social"
                  value={empresa.razao_social}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>CNPJ</Form.Label>
                <Form.Control
                  type="text"
                  name="cnpj"
                  value={empresa.cnpj}
                  onChange={handleChange}
                  required
                  placeholder="00.000.000/0000-00"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>CEP</Form.Label>
                <Form.Control
                  type="text"
                  name="cep"
                  value={empresa.cep}
                  onChange={handleChange}
                  required
                  placeholder="00000-000"
                />
              </Form.Group>
            </div>

            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Cidade</Form.Label>
                <Form.Control
                  type="text"
                  name="cidade"
                  value={empresa.cidade}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Estado</Form.Label>
                <Form.Control
                  type="text"
                  name="estado"
                  value={empresa.estado}
                  onChange={handleChange}
                  required
                  maxLength={2}
                  placeholder="SP"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Bairro</Form.Label>
                <Form.Control
                  type="text"
                  name="bairro"
                  value={empresa.bairro}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Complemento</Form.Label>
                <Form.Control
                  type="text"
                  name="complemento"
                  value={empresa.complemento}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            Salvar Empresa
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
