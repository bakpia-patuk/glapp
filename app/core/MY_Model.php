<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

class MY_Model extends CI_Model {

    public $table;
    public $params = array();
    public $options = array();

    /**
     * Use the pattern below for params.
     * $params['xxx'] = array('field' => 'xxx', 'param' => '_ci_pattern(where/or_where/like/or_like)_', 'operator' => '=', 'value' => 'xxx');
     */
    public function __construct() {
        parent::__construct();
        $this->table = get_Class($this);
    }

    /**
     * _required method returns false if the $data array does not contain all of the keys assigned by the $required array.
     *
     * @param array $required
     * @param array $data
     * @return bool
     */
    function _required($required, $data) {
        foreach ($required as $field) {
            if (!isset($data[$field])) {
                return false;
            }
        }
        return true;
    }

    /**
     * _default method combines the options array with a set of defaults giving the values in the options array priority.
     *
     * @param array $defaults
     * @param array $options
     * @return array
     */
    function _default($defaults, $options) {
        return array_merge($defaults, $options);
    }

    function gets($params = NULL, $options = NULL, $tablename = "") {
        if ($tablename == "") {
            $tablename = $this->table;
        }

        // Add where clauses to query
        if ($params != NULL) {
            foreach ($params as $data) {
                if (isset($options['third'])) {
                    $this->db->$data['param']($data['field'] . $data['operator'], $data['value'], $options['third']);
                } else {
                    $this->db->$data['param']($data['field'] . $data['operator'], $data['value']);
                }
            }
        }

        // If limit / offset are declared (usually for pagination) then we need to take them into account
        if (isset($options['limit']) && isset($options['offset'])) {
            $this->db->limit($options['limit'], $options['offset']);
        } else if (isset($options['limit'])) {
            $this->db->limit($options['limit']);
        }
        // sort
        if (isset($options['sortBy'])) {
            $this->db->order_by($options['sortBy'], $options['sortDirection']);
        }
        // group
        if (isset($options['groupBy'])) {
            $this->db->group_by($options['groupBy']);
        }

        $query = $this->db->get($tablename);

        if ($query->num_rows() == 0) {
            return false;
        }

        return $query->result();
    }

    function gets_count($params = NULL, $options = NULL, $tablename = "") {
        if ($tablename == "") {
            $tablename = $this->table;
        }

        // Add where clauses to query
        if ($params != NULL) {
            foreach ($params as $data) {
                if (isset($options['third'])) {
                    $this->db->$data['param']($data['field'] . $data['operator'], $data['value'], $options['third']);
                } else {
                    $this->db->$data['param']($data['field'] . $data['operator'], $data['value']);
                }
            }
        }

        // group
        if (isset($options['groupBy'])) {
            $this->db->group_by($options['groupBy']);
        }
        $query = $this->db->get($tablename);

        return $query->num_rows();
    }

    public function get($params = NULL, $options = NULL, $tablename = "") {
        if ($tablename == "") {
            $tablename = $this->table;
        }

        // Add where clauses to query
        if ($params != NULL) {
            foreach ($params as $data) {
                if (isset($options['third'])) {
                    $this->db->$data['param']($data['field'] . $data['operator'], $data['value'], $options['third']);
                } else {
                    $this->db->$data['param']($data['field'] . $data['operator'], $data['value']);
                }
            }
        }

        // If limit / offset are declared (usually for pagination) then we need to take them into account
        if (isset($options['limit']) && isset($options['offset'])) {
            $this->db->limit($options['limit'], $options['offset']);
        } else if (isset($options['limit'])) {
            $this->db->limit($options['limit']);
        }

        // sort
        if (isset($options['sortBy'])) {
            $this->db->order_by($options['sortBy'], $options['sortDirection']);
        }

        // group
        if (isset($options['groupBy'])) {
            $this->db->group_by($options['groupBy']);
        }

        $query = $this->db->get($tablename);
        if ($query->num_rows() == 0) {
            return false;
        }

        return $query->row();
    }

    public function get_detail($param, $value, $table) {
        $opt[] = array('field' => $param, 'param' => 'where', 'operator' => '', 'value' => $value);
        $detail = $this->get($opt, $options = NULL, $table);
        return $detail;
    }

    public function get_detail_like($param, $value, $table) {
        $opt[] = array('field' => $param, 'param' => 'like', 'operator' => '', 'value' => $value);
        $detail = $this->get($opt, $options = NULL, $table);
        return $detail;
    }

    public function get_detail_array($param, $value, $table) {
        $data = explode(';', $param);
        $val = explode(';', $value);
        for ($i = 0; $i < count($data); $i++) {
            $opt[] = array('field' => $data[$i], 'param' => 'where', 'operator' => '', 'value' => $val[$i]);
        }
        $detail = $this->get($opt, $options = NULL, $table);
        return $detail;
    }

    function insert($data, $tablename = "") {
        if ($tablename == "") {
            $tablename = $this->table;
        }
        $this->db->insert($tablename, $data);
        return $this->db->insert_id();
    }

    function update($data, $params = NULL, $options = NULL, $tablename = "") {
        if ($tablename == "") {
            $tablename = $this->table;
        }
        // Add where clauses to query
        if ($params != NULL) {
            foreach ($params as $row) {
                if (isset($options['third'])) {
                    $this->db->$row['param']($row['field'] . $row['operator'], $row['value'], $options['third']);
                } else {
                    $this->db->$row['param']($row['field'] . $row['operator'], $row['value']);
                }
            }
        }
        $this->db->update($tablename, $data);
        if ($this->db->affected_rows() >= 0) {
            return TRUE;
        }
        return FALSE;
    }

    function delete($params = NULL, $options = NULL, $tablename = "") {
        if ($tablename == "") {
            $tablename = $this->table;
        }
        // Add where clauses to query
        if ($params != NULL) {
            foreach ($params as $data) {
                if (isset($options['third'])) {
                    $this->db->$data['param']($data['field'] . $data['operator'], $data['value'], $options['third']);
                } else {
                    $this->db->$data['param']($data['field'] . $data['operator'], $data['value']);
                }
            }
        }
        $this->db->delete($tablename);
        return $this->db->affected_rows();
    }

    public function money_formatter($param) {
        if (isset($param)) {
            $dirt_money = str_replace(".", "", $param);
            $clean = str_replace(",", ".", $dirt_money);
            return $clean;
        } else {
            return FALSE;
        }
    }

    public function standard_money($param) {
        if (isset($param)) {
            $clean = str_replace(",", "", $param);
            return $clean;
        } else {
            return FALSE;
        }
    }

    public function generate_user_log($user, $cabang, $action, $form_id) {
        $user_detail = $this->get_detail_like('id', $user, 'users');
        if ($action == 'LOGIN' || $action == 'LOGOUT') {
            $generate = strtoupper($user_detail->first_name . ' ' . $user_detail->last_name) . ' has been ' . $action;
        } else {
            $generate = strtoupper($user_detail->first_name . ' ' . $user_detail->last_name) . ' ' . $action . ' data in ' . $form_id;
        }
        $data = array(
            'date' => now(),
            'activity' => $generate,
            'user_id' => $user,
            'cabang_id' => $cabang
        );

        $this->insert($data, 'sv_logging');
        return TRUE;
    }

}
